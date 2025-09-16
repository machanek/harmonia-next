import { styled } from '@/lib/stitches.config';

// Architecture Section
export const ArchitectureSection = styled('section', {
  padding: '$16 0',
  backgroundColor: '$background',
});

export const ArchitectureContainer = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 $4',
  
  '@md': {
    padding: '0 $6',
  },
});

export const ArchitectureGrid = styled('div', {
  display: 'grid',
  gap: '$8',
  gridTemplateColumns: '1fr',
  
  '@lg': {
    gridTemplateColumns: '2fr 1fr',
    gap: '$12',
  },
});

// Architecture Content
export const ArchitectureContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

export const ArchitectureTitle = styled('h2', {
  fontSize: '$8',
  fontWeight: '$4',
  color: '$textDark',
  marginBottom: '$6',
  lineHeight: '$3',
  
  '@md': {
    fontSize: '$9',
  },
});

export const ArchitectureText = styled('p', {
  fontSize: '$3',
  lineHeight: '$4',
  color: '$textDark',
  marginBottom: '$4',
  
  '&:last-child': {
    marginBottom: 0,
  },
});

// Metrics Card
export const MetricsCard = styled('aside', {
  backgroundColor: '$backgroundLight',
  borderRadius: '$4',
  padding: '$6',
  boxShadow: '$2',
  border: '1px solid $border',
  height: 'fit-content',
  
  '@lg': {
    position: 'sticky',
    top: '$20',
  },
});

export const MetricsTitle = styled('h3', {
  fontSize: '$5',
  fontWeight: '$4',
  color: '$textDark',
  marginBottom: '$4',
  textAlign: 'center',
});

export const MetricsList = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});

export const MetricPill = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$3 $4',
  backgroundColor: '$background',
  borderRadius: '$2',
  border: '1px solid $border',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '$primary',
    color: '$textWhite',
    transform: 'translateY(-1px)',
    boxShadow: '$2',
  },
});

export const MetricCode = styled('span', {
  fontSize: '$3',
  fontWeight: '$4',
  color: 'inherit',
});

export const MetricValue = styled('span', {
  fontSize: '$3',
  fontWeight: '$3',
  color: 'inherit',
});
