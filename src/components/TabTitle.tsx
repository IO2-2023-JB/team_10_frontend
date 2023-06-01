import { Helmet } from 'react-helmet';

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default TabTitle;
