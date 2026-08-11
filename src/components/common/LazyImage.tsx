import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
}

export const LazyImage = ({
    src,
    alt,
    className,
    containerClassName,
    ...props
}: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={cn('relative w-full h-full overflow-hidden', containerClassName)}>
            {!isLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full bg-muted" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    'w-full h-full object-cover transition-all duration-500',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                    className
                )}
                {...props}
            />
        </div>
    );
};
