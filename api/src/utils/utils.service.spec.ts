import { ConfigService } from '@nestjs/config';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeEach(() => {
    const configService = new ConfigService();
    utilsService = new UtilsService(configService);
  });

  describe('makeUsername', () => {
    const cases = [
      {
        args: {
          firstName: 'john',
          lastName: 'doe',
        },
        expect: 'jdoe',
      },
      {
        args: {
          firstName: 'celine',
          lastName: 'dion',
        },
        expect: 'cdion',
      },
      {
        args: {
          firstName: 'johny',
          lastName: 'belravia',
        },
        expect: 'jbelravi',
      },
    ];

    for (let index = 0; index < cases.length; index++) {
      it(`should be ${cases[index].expect} with ${cases[index].args.firstName} ${cases[index].args.lastName}`, () => {
        const username = utilsService.makeUsername(
          cases[index].args.firstName,
          cases[index].args.lastName,
        );

        expect(username).toEqual(cases[index].expect);
      });
    }
  });
});
