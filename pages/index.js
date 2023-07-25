import Head from 'next/head';
import Scene from '../components/Scene';
import Preloader from '../components/Preloader';

const Home = () => {
    return (
        <div>
            <Head>
                <title>My 3D App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Preloader />
                <Scene />
        </div>
    );
};

export default Home;
