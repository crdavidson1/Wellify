import React from 'react';
import PostureDetection from './PostureDetection';

const Home: React.FC<any> = ({settings}) => {
    return <PostureDetection settings={settings}/>
}

export default Home