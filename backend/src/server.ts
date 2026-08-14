import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SYSTEM REGISTRY]: Core SBA Server actively running on Port ${PORT}`);
});
