import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FullCalendar from '.';

test('renders calendar iframe with correct attributes', () => {
  const { container } = render(<FullCalendar />);
  const iframe = container.querySelector('iframe');

  expect(iframe).toBeInTheDocument();

  expect(iframe).toHaveAttribute('width', '830');
  expect(iframe).toHaveAttribute('height', '620');

  expect(iframe).toHaveAttribute(
    'src',
    'https://outlook.live.com/calendar/0/published/00000000-0000-0000-0000-000000000000/bcc35105-a008-4175-b085-4d7a936bfaf0/cid-1C604F3B8CD58FCB/calendar.html/'
  );
});

test('renders with the correct CSS classes', () => {
  const { container } = render(<FullCalendar />);
  const calendarTile = container.querySelector('.calendar-tile');
  const calendarTileWhite = container.querySelector('.calendar-tile-white');

  expect(calendarTile).toBeInTheDocument();
  expect(calendarTileWhite).toBeInTheDocument();
});
