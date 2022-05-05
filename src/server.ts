import express, { Request, Response } from 'express';
console.log('Server started');
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log('Server is running on port 3000');
});
