import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

function Video() {
  const { videoId } = useParams();

  return <PageLayout>{videoId}</PageLayout>;
}

export default Video;
