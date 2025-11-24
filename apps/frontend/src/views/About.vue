<template>
  <v-row class="about">
    <v-col md="6" offset-md="3">
      <v-card>
        <v-img height="100px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-overlay class="align-end justify-start" absolute color="#000000" opacity="0.8">
            <v-card-title>About the Malaysia voting</v-card-title>
          </v-overlay>
        </v-img>

        <v-card-subtitle class="pb-0">Short summary</v-card-subtitle>
        <v-card-text class="text--primary">
          The Malaysia voting is open Everyone can vote

          The website was created by hallowatcher edited by Laphii.<br>
          The voting is held yearly to determine the top 10 players in Malaysia.<br>
          You can check out the original repository <a href="https://gitlab.com/hallowatcher/osu-voting-new" target="_blank">here</a> <br>
          any anquiries can be directed to @_sagisawa on Discord 

          <v-divider class="mt-10"></v-divider>
          <v-timeline dense>
            <v-timeline-item fill-dot large color="red" class="font-weight-bold">
              <template v-slot:icon>
                <v-icon class="text-h3">mdi-information</v-icon>
              </template>

              <v-row>
                <v-col>Voting timeline</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="yellow">
              <v-row>
                <v-col sm="2"><b>2025.11.24</b></v-col>
                <v-col>Voting opens</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col sm="2"><b>2026.01.02</b></v-col>
                <v-col>Voting ends</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col sm="2"><b>Progressing...</b></v-col>
                <v-col>Video production starts</v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="grey">
              <v-row>
                <v-col sm="2"><b>Coming Soon</b></v-col>
                <v-col>Video publishing (estimated)</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
          <v-divider class="mb-10"></v-divider>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
