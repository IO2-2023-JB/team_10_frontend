import { Helmet } from 'react-helmet';
import { baseTitle } from '../const/tab_titles';

interface TabTitleProps {
  title: string;
  skipBaseTitle?: boolean;
}

function TabTitle({ title, skipBaseTitle = false }: TabTitleProps) {
  if (!skipBaseTitle) title += baseTitle;
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default TabTitle;
