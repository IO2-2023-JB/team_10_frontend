import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../api/user';
import TabTitle from '../../components/TabTitle';
import PageLayout from '../../components/layout/PageLayout';
import { ROUTES } from '../../const';
import { TabTitles } from '../../const/tab_titles';
import VideoUploadForm from './VideoUploadForm';

function Upload() {
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  useEffect(() => {
    if (isAdmin) navigate(`/${ROUTES.HOMEPAGE}`, { replace: true });
  });

  if (!isAdmin) return null;

  return (
    <>
      {isAdmin && (
        <PageLayout>
          <TabTitle title={TabTitles.Upload} />
          <VideoUploadForm />
        </PageLayout>
      )}
    </>
  );
}

export default Upload;
