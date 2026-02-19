import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup, createEmptyLookup } from '#common/models';
import { renderHook, act } from '@testing-library/react';

describe('useConfirmationDialog', () => {
  it('Should initialize with default values', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it("Should set isOpen to true and itemToDelete to it's new value when onOpenDialog is called", () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    const newValue: Lookup = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.onOpenDialog(newValue);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(newValue);
  });

  it('Should set isOpen to false when onClose is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('Should reset itemToDelete when onAccept is called (with updated item)', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: '1', name: 'Item 1' };

    act(() => {
      result.current.onOpenDialog(item);
    });

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('Should set the current itemToDelete to default value when onAccept is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('Should set isOpen to true and itemToDelete when onOpenDialog is called', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = { id: '1', name: 'Item 1' };

    // Act
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });
});
