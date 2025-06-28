import dev from './environment.dev';
import prod from './environment.prod';
import base from './environment';

// Use REACT_APP_ENV if set, otherwise fallback to NODE_ENV
const env = "development"; // Replace with process.env.REACT_APP_ENV || process.env.NODE_ENV

let envConfig = base;

if (env === 'development') {
  envConfig = dev;
} else if (env === 'production') {
  envConfig = prod;
}

export default envConfig;
