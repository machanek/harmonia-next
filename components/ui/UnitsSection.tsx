import { styled } from '@/lib/stitches.config';

// Section Container
export const UnitsSection = styled('section', {
  padding: '$16 0',
  backgroundColor: '$backgroundLight',
});

export const SectionContainer = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 $4',
});

export const SectionTitle = styled('h2', {
  fontSize: '$8',
  fontWeight: '$4',
  color: '$textDark',
  marginBottom: '$8',
  textAlign: 'center',
});

// Filters
export const FiltersForm = styled('form', {
  backgroundColor: '$background',
  padding: '$6',
  borderRadius: '$4',
  boxShadow: '$2',
  marginBottom: '$6',
});

export const FiltersGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '$4',
  marginBottom: '$4',
  
  '@md': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  '@lg': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});

export const FilterGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const FilterLabel = styled('label', {
  fontSize: '$2',
  fontWeight: '$2',
  color: '$textDark',
});

export const FilterSelect = styled('select', {
  padding: '$2 $3',
  border: '1px solid $border',
  borderRadius: '$2',
  fontSize: '$3',
  fontFamily: '$primary',
  backgroundColor: '$background',
  cursor: 'pointer',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary',
    boxShadow: '0 0 0 2px rgba(31, 61, 50, 0.1)',
  },
});

export const FilterInput = styled('input', {
  padding: '$2 $3',
  border: '1px solid $border',
  borderRadius: '$2',
  fontSize: '$3',
  fontFamily: '$primary',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary',
    boxShadow: '0 0 0 2px rgba(31, 61, 50, 0.1)',
  },
});

export const FilterActions = styled('div', {
  display: 'flex',
  gap: '$3',
  justifyContent: 'center',
  marginTop: '$4',
});

// View Controls
export const ViewControls = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$6',
  flexWrap: 'wrap',
  gap: '$4',
});

export const ViewSwitch = styled('div', {
  display: 'flex',
  gap: '$2',
});

export const ViewButton = styled('button', {
  padding: '$2 $4',
  border: '1px solid $border',
  borderRadius: '$2',
  backgroundColor: '$background',
  color: '$textDark',
  fontSize: '$2',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '$backgroundLight',
  },
  
  variants: {
    active: {
      true: {
        backgroundColor: '$primary',
        color: '$textWhite',
        borderColor: '$primary',
      },
    },
  },
});

export const ResultsInfo = styled('div', {
  fontSize: '$3',
  color: '$textDark',
});

export const ResultsCount = styled('span', {
  fontWeight: '$3',
});

// Table
export const TableContainer = styled('div', {
  backgroundColor: '$background',
  borderRadius: '$4',
  boxShadow: '$2',
  overflow: 'hidden',
  marginBottom: '$6',
});

export const UnitsTable = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '$2',
});

export const TableHeader = styled('thead', {
  backgroundColor: '$backgroundDark',
});

export const TableHeaderCell = styled('th', {
  padding: '$3 $4',
  textAlign: 'left',
  fontWeight: '$3',
  color: '$textDark',
  borderBottom: '1px solid $border',
  fontSize: '$2',
});

export const TableBody = styled('tbody', {});

export const TableRow = styled('tr', {
  borderBottom: '1px solid $borderLight',
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: '$backgroundLight',
  },
  
  '&:last-child': {
    borderBottom: 'none',
  },
  
  variants: {
    sold: {
      true: {
        opacity: 0.6,
        backgroundColor: '$backgroundLight',
      },
    },
  },
});

export const TableCell = styled('td', {
  padding: '$3 $4',
  color: '$textDark',
  fontSize: '$2',
});

// Status Badge
export const StatusBadge = styled('span', {
  display: 'inline-block',
  padding: '$1 $2',
  borderRadius: '$1',
  fontSize: '$1',
  fontWeight: '$3',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  
  variants: {
    status: {
      free: {
        backgroundColor: '$success',
        color: '$textWhite',
      },
      reserved: {
        backgroundColor: '$warning',
        color: '$textWhite',
      },
      sold: {
        backgroundColor: '$textLight',
        color: '$textWhite',
      },
    },
  },
});

// Legend
export const StatusLegend = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$6',
  flexWrap: 'wrap',
});

export const LegendItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
});

export const LegendBadge = styled('span', {
  width: '$3',
  height: '$3',
  borderRadius: '$1',
  
  variants: {
    status: {
      free: {
        backgroundColor: '$success',
      },
      reserved: {
        backgroundColor: '$warning',
      },
      sold: {
        backgroundColor: '$textLight',
      },
    },
  },
});

export const LegendLabel = styled('span', {
  fontSize: '$2',
  color: '$textDark',
  fontWeight: '$2',
});

// Plan Link
export const PlanLink = styled('a', {
  display: 'inline-block',
  padding: '$1 $2',
  backgroundColor: '$primary',
  color: '$textWhite',
  textDecoration: 'none',
  borderRadius: '$1',
  fontSize: '$1',
  fontWeight: '$2',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '$primaryDark',
    transform: 'translateY(-1px)',
  },
});

// Cards Layout
export const CardsContainer = styled('div', {
  display: 'grid',
  gap: '$4',
  gridTemplateColumns: '1fr',
  
  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  '@md': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  '@lg': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  
  '@xl': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});

// Unit Card
export const UnitCard = styled('article', {
  backgroundColor: '$background',
  borderRadius: '$3',
  padding: '$4',
  boxShadow: '$2',
  border: '1px solid $border',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    boxShadow: '$3',
    transform: 'translateY(-2px)',
  },
  
  variants: {
    sold: {
      true: {
        opacity: 0.6,
        backgroundColor: '$backgroundLight',
      },
    },
  },
});

// Card Header
export const CardHeader = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '$3',
  paddingBottom: '$2',
  borderBottom: '1px solid $borderLight',
});

export const CardId = styled('div', {
  fontSize: '$4',
  fontWeight: '$4',
  color: '$textDark',
});

// Card Info
export const CardInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  marginBottom: '$3',
});

export const CardField = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '$2',
});

export const FieldLabel = styled('span', {
  color: '$textLight',
  fontWeight: '$2',
});

export const FieldValue = styled('span', {
  color: '$textDark',
  fontWeight: '$3',
  textAlign: 'right',
  flex: 1,
  marginLeft: '$2',
});

// Card Details
export const CardDetails = styled('div', {
  marginBottom: '$3',
  padding: '$2',
  backgroundColor: '$backgroundLight',
  borderRadius: '$2',
  fontSize: '$2',
  color: '$textDark',
});

// Card Actions
export const CardActions = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '$2',
  borderTop: '1px solid $borderLight',
});

// Muted Text
export const MutedText = styled('span', {
  color: '$textLight',
  fontSize: '$2',
  fontStyle: 'italic',
});
