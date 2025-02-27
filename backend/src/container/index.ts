import { container } from 'tsyringe';

import { CurrenciesRepository } from '@infra/databases/mongoose/repositories/CurrenciesRepository';

import { ICurrenciesRepository } from '@repositories/models/ICurrenciesRepository';

// Providers
import './providers/CacheProvider';
import './providers/CurrencyConverterProvider';
import './providers/DateProvider';

// Repositories
container.registerSingleton<ICurrenciesRepository>(
  'CurrenciesRepository',
  CurrenciesRepository,
);
