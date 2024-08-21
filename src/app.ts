import express from 'express';
import route from "./routes/indexRoutes"
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagerOption';



const app = express();

const port = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(route)

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
