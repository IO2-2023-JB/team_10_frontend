import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import Metadata from './Metadata';
import Player from './Player';

function Video() {
  const { videoId } = useParams();

  return (
    <PageLayout>
      <Player videoId={videoId!} />
      <Metadata />
    </PageLayout>
  );
}

export default Video;
