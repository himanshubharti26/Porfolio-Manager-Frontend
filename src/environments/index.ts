import dev from './environment.dev';
import prod from './environment.prod';
import base from './environment';

let envConfig = base;

if (process.env.NODE_ENV === 'development') {
  envConfig = dev;
} else if (process.env.NODE_ENV === 'production') {
  envConfig = prod;
}

export default envConfig;
