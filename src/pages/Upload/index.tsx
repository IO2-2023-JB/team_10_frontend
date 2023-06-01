import TabTitle from '../../components/TabTitle';
import PageLayout from '../../components/layout/PageLayout';
import { TabTitles } from '../../const/tab_titles';
import VideoUploadForm from './VideoUploadForm';

function Upload() {
  return (
    <PageLayout>
      <TabTitle title={TabTitles.Upload} />
      <VideoUploadForm />
    </PageLayout>
  );
}

export default Upload;
