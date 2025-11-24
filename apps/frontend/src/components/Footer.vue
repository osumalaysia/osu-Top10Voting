<template>
  <v-footer app padless absolute>
    <v-card flat tile width="100%" class="lighten-1 text-center">
      <v-card-text>
        <v-btn class="mx-4 white--text" icon href="https://arisu.s-ul.eu/nySC9dQU" target="_blank">
          <v-icon size="24px">mdi-web</v-icon>
        </v-btn>

        <v-btn class="mx-4 white--text" icon href="https://www.youtube.com/@osumys" target="_blank">
          <v-icon size="24px">mdi-youtube</v-icon>
        </v-btn>

        <v-btn class="mx-4 white--text" icon href="https://discord.gg/bKWwf8j" target="_blank">
          <v-img src="../assets/dc.png" max-width="24px" max-height="24px" alt="Discord"></v-img>
        </v-btn>

        <v-btn class="mx-4 white--text" icon href="https://www.twitch.tv/osumalaysia" target="_blank">
          <v-icon size="24px">mdi-twitch</v-icon>
        </v-btn>

        <v-btn class="mx-4 white--text" icon href="https://x.com/osumalaysia?t=A_UxvV7x9DvtfR1MW6M6ng&s=09" target="_blank">
          <v-img src="../assets/x.png" max-width="24px" max-height="24px" alt="X"></v-img>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="pb-0">
        Created by <strong>hallowatcher</strong>, edited by
        <a href="https://osu.ppy.sh/users/9364594" target="_blank" rel="noopener noreferrer"
          style="color: rgba(255, 255, 255, 0.7);">
          Sagisawa Arisu</a>,
        deployed by <a href="https://osu.ppy.sh/users/9534110" target="_blank" rel="noopener noreferrer"
          style="color: rgba(255, 255, 255, 0.7);">
          Amamiya Kokoro</a>.
      </v-card-text>

      <v-card-text class="pt-0">
        {{ new Date().getFullYear() }} – plz enjoy game
      </v-card-text>
    </v-card>
  </v-footer>
</template>
