import { Module, NestModule, MiddlewareConsumer, forwardRef, HttpModule, HttpService } from '@nestjs/common';
import { AuthController } from './auth.controller';
import * as passport from 'passport';
import * as OAuth2Strategy from 'passport-oauth2';

import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { map } from 'rxjs/operators';
import { ChoiceModule } from '../choice/choice.module';
import { ChoiceService } from '../choice/choice.service';
import { ChoiceEntity } from '../choice/choice.entity';

@Module({
  controllers: [AuthController],
  imports: [
    HttpModule,
    forwardRef(() => UserModule),
    forwardRef(() => ChoiceModule),
  ],
  providers: [],
  exports: []
})
export class AuthModule implements NestModule {
  constructor(private userService: UserService, private httpService: HttpService, private choiceService: ChoiceService) {
    passport.serializeUser((user: UserEntity, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      const user = await this.userService.findById(id);
      done(null, user);
    });

    passport.use(
      new OAuth2Strategy(
        {
          authorizationURL: 'https://osu.ppy.sh/oauth/authorize?scope=identify',
          tokenURL: 'https://osu.ppy.sh/oauth/token',
          clientID: process.env.OSU_CLIENT_ID,
          clientSecret: process.env.OSU_CLIENT_SECRET,
          callbackURL: process.env.OSU_CALLBACK_URL
        },
        async (accessToken, refreshToken, profileEmpty, cb) => {
          const apiUser: any = await this.getProfile(accessToken).toPromise();

          // Fetch german leaderboard if user = hallowatcher
          if (apiUser.username === 'Sagisawa Arisu') {
            const choices = await this.choiceService.findAll();

            if (choices.length === 0) {
              const malaysiaLeaderboardPageOne = (await this.getMalaysiaLeaderboard(accessToken, 1).toPromise()).ranking;
              const malaysiaLeaderboardPageTwo = (await this.getMalaysiaLeaderboard(accessToken, 2).toPromise()).ranking;
              const malaysiaLeaderboardPageThree = (await this.getMalaysiaLeaderboard(accessToken, 3).toPromise()).ranking;
              this.saveChoices(malaysiaLeaderboardPageOne, 1);
              this.saveChoices(malaysiaLeaderboardPageTwo, 2);
              this.saveChoices(malaysiaLeaderboardPageThree, 3);
            }
          }

          const user = await this.userService.updateOrCreate(apiUser);
          return cb(null, user);
        }
      )
    );
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.saveReturnUrl).forRoutes('/auth/login', '/auth/logout');

    consumer.apply(passport.authenticate('oauth2', {
      failureRedirect: '/',
      scope: ['public']
    })).forRoutes('/auth/login');

    consumer.apply(passport.authenticate('oauth2', {
      failureRedirect: '/'
    })).forRoutes('/auth/callback');
  }

  private saveReturnUrl(req, res, next) {
    if (req.query.redirect) {
      req.session.oauth2return = decodeURIComponent(req.query.redirect);
    } else {
      req.session.oauth2return = null;
    }

    next();
  }

  getProfile(token: string) {
    return this.httpService.get('https://osu.ppy.sh/api/v2/me/osu', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map(e => e.data)
    );
  }

  getMalaysiaLeaderboard(token: string, page: number) {
    return this.httpService.get(`https://osu.ppy.sh/api/v2/rankings/osu/performance?country=MY&cursor[page]=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      map(e => e.data)
    );
  }

  saveChoices(choices: any[], page: number) {
    const perPage = 50;

    choices.map(async (e, index) => {
      try {
        const choice = new ChoiceEntity();
        choice.id = e.user.id;
        choice.username = e.user.username;
        choice.country = e.user.country_code;
        choice.rank = e.global_rank;
        choice.countryRank = (index + 1) + (perPage * (page - 1));
        await this.choiceService.save(choice);
      } catch {
        // Do nothing
      }
    });
  }
}
