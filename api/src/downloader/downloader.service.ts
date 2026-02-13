import { Injectable } from '@nestjs/common';

// https://github.com/Jackett/Jackett
// https://github.com/BrokenEmpire/YTS/blob/master/API.md
// https://yts.bz/api/v2/list_movies.json

const YTS_ENDPOINT: string = 'https://yts.bz/api/v2';

const YTS_TRACKERS: [string] = [
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.leechers-paradise.org:6969',
];

@Injectable()
export class DownloaderService {
  donwload() {
    return 0;
  }
}
