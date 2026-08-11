import { useEffect } from 'react';

export const useImageProtection = () => {
    useEffect(() => {
        // Disable right-click context menu on images
        const handleContextMenu = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // Disable drag and drop on images
        const handleDragStart = (e: DragEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // Disable keyboard shortcuts for saving (Ctrl+S) and printing (Ctrl+P) as a deterrent
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
};
