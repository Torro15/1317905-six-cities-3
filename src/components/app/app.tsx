import MainPage from '../../pages/main/main-page.tsx';

type AppScreenProps = {
  cardsCount: number;
  offersCount: number;
}

function App({cardsCount, offersCount}: AppScreenProps): JSX.Element {
  return (
    <MainPage cardsCount={cardsCount}
      offersCount={offersCount}
    />
  );
}

export default App;
