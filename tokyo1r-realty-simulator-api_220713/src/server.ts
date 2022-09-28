import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import PropertiesRoute from '@routes/properties.route';
import MyPropertiesRoute from '@routes/myproperties.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(), 
    new AuthRoute(),
    new PropertiesRoute(),
    new MyPropertiesRoute(),
]);

app.listen();
