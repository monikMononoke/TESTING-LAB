import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const props: React.ComponentProps<typeof ConfirmationDialogComponent> = {
  isOpen: true,
  onAccept: vi.fn(),
  onClose: vi.fn(),
  title: 'Confirmation',
  labels: {
    closeButton: 'Close',
    acceptButton: 'Accept',
  },
  children: <p>Are you sure?</p>,
};

describe('ConfirmationDialog', () => {
  it('Should display a button with text "Accept" ', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const acceptButton = screen.getByRole('button', { name: 'Accept' });

    // Assert
    expect(acceptButton).toBeInTheDocument();
  });

  it('Should display a button with text "Close"', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });

    // Assert
    expect(closeButton).toBeInTheDocument();
  });

  it('Should call onAccept when the "Accept" button is clicked', async () => {
    // Arrange

    render(<ConfirmationDialogComponent {...props} />);

    const acceptButton = screen.getByRole('button', { name: 'Accept' });

    // Act
    await userEvent.click(acceptButton);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('Should call onClose when the "Close" button is clicked', async () => {
    // Arrange
    render(<ConfirmationDialogComponent {...props} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });

    // Act
    await userEvent.click(closeButton);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should render title and message passed as props', () => {
    // Arrange
    const customProps = {
      ...props,
      title: 'Custom Title',
      children: <p>Custom Message</p>,
    };

    // Act
    render(<ConfirmationDialogComponent {...customProps} />);

    const title = screen.getByText('Custom Title');
    const message = screen.getByText('Custom Message');

    // Assert
    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
