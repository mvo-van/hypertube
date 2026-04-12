# hypertube 🎬

Hypertube is a web project originated from the 42 School, the goal is to be able
to watch any movie available on differents torrent sources.

When selecting a movie, if the torrent download has sufficient data to send to the front-end,
it'll be automatically transcoded in a compatible format and streamed to the end user.

## Authentification

### Basic authentification

You can login with your own email and password, created on the signup page.

### OAuth

We provide six differents OAuth strategies :
- Google
- 42
- Spotify
- Discord
- Gitlab
- Github

## Catalog

The catalog provide an incredible amount of contents from diverse sources like OMDB and TMDD.\
With that information, we then 


## Tech Stack

- [NestJS](https://nestjs.com/)
- [ffmpeg](https://ffmpeg.org/)
- [Typeorm](https://typeorm.io/)
- [React](https://fr.react.dev/)
- [Jackett](https://github.com/Jackett/Jackett)
- [Opensubtitle](https://www.opensubtitles.com/)
- [Passport](https://docs.nestjs.com/recipes/passport)
- Postgres


## NestJS

We decided to use NestJS for its robustness and expressivity. Data validation and transformation are made easy thanks to
`class-validator` and `class-transform` providing useful decorators.
The differentiation between the domain logic and the infrastructure part is well made and helps to keep a clean code base.


## Jackett

We use jackett extensively in order to retrieve torrent magnets from a Torznab format.
Then we use a scoring function to filter torrent on different criterion that will be the most 
efficient in terms of download time.

### Scoring function

We score each torrent with the number of **seeders** and the torrent **quality**.


## Credits

This project has been made by :
- [tbellavia](https://github.com/tbellavia) (**back**) :
  - back-end
  - transcoding
  - streaming
  - torrent download
  - infra
- [mvo-van](https://github.com/mvo-van) (**front / back**) :
  - front-end
  - video player
  - transcoding
  - subtitles download
  - movie catalog
- [fullife32](https://github.com/fullife32) (**front**) :
  - login
  - profile
  - settings
  - error management