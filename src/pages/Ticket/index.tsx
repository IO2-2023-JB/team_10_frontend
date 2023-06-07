import ContentSection from '../../components/layout/ContentSection';
import PageLayout from '../../components/layout/PageLayout';
import { useTicketList } from '../../api/ticket';
import TicketList from './TicketList';

function Ticket() {
  const { data: tickets, error, isLoading } = useTicketList();

  return (
    <PageLayout>
      <ContentSection error={error} isLoading={isLoading}>
        {tickets && <TicketList tickets={tickets} />}
      </ContentSection>
    </PageLayout>
  );
}

export default Ticket;
