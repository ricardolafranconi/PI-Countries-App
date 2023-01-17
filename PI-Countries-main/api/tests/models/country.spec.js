const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true })); // antes de cada it, sincronizamos la base de datos. Force true hace que se sincronice el modelo con la base de datos, borrando los datos que hubiera en la misma.
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});




// describe('Country model', () => {
//   beforeAll(async () => {
//     try {
//       await conn.authenticate();
//     } catch (err) {
//       console.error('Unable to connect to the database:', err);
//     }
//   });
//   describe('Validators', () => {
//     beforeEach(() => Country.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', async () => {
//         try {
//           await Country.create({});
//         } catch (err) {
//           expect(err).toBeDefined();
//           return;
//         }
//         throw new Error('It should have thrown an error');
//       });
//       it('should work when its a valid name', async () => {
//         await Country.create({ name: 'Argentina', flag: 'Argentina-flag.png', continent: 'South America', subregion: 'Southern Cone', capital:'Buenos Aires', area: 2780400, population: 44293293 });
//         expect(true).toBe(true);
//       });
//     });
//   });
// });

