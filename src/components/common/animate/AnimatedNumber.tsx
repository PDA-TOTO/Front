import { Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type AnimatedNumberProps = {
    includeComma?: boolean;
    toNumber: number;
    prefix?: string;
    suffix?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    fw?: 'bold' | 'bolder';
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
    includeComma,
    toNumber,
    prefix,
    suffix,
    size,
    fw,
}: AnimatedNumberProps) => {
    const rootRef = useRef(null);
    const { ref, height } = useElementSize();
    const keyCount = useRef(0);
    const [mount, setMount] = useState<number>(0);

    const animateTonumberString = includeComma ? Math.abs(toNumber).toLocaleString() : String(Math.abs(toNumber));
    const animateToNumberArr: Array<string | number> = Array.from(animateTonumberString, Number).map((x, idx) =>
        isNaN(x) ? animateTonumberString[idx] : x
    );

    useEffect(() => {
        if (mount < 2) {
            setMount(mount + 1);
        }
    }, [toNumber]);

    const animatedPart = () => {
        return (
            <div style={{ display: 'flex', overflow: 'hidden', height: height }}>
                {prefix ? (
                    <Text size={size} fw={fw} ps={12}>
                        {prefix}
                    </Text>
                ) : (
                    <></>
                )}
                {animateToNumberArr.map((data, index) => {
                    if (typeof data === 'string') {
                        return (
                            <Text key={index} size={size} fw={fw}>
                                {data}
                            </Text>
                        );
                    }
                    return (
                        <div key={index}>
                            {prefix}
                            {NUMBERS.map((num) => (
                                <motion.div
                                    key={`${keyCount.current++}`}
                                    animate={'visible'}
                                    transition={{ type: 'spring', duration: Math.log2(index) * 0.7 + 1 }}
                                    variants={{
                                        hiddden: { y: 0 },
                                        visible: {
                                            y: -1 * (height * data) - height * 20,
                                        },
                                    }}
                                >
                                    <Text size={size} fw={fw}>
                                        {num}
                                    </Text>
                                </motion.div>
                            ))}
                        </div>
                    );
                })}
                <Text size={size} fw={fw} ps={12}>
                    {suffix}
                </Text>
            </div>
        );
    };

    return (
        <span ref={rootRef}>
            {mount > 1 ? (
                animatedPart()
            ) : (
                <div style={{ display: 'flex', overflow: 'hidden', height: height }}>
                    {prefix ? (
                        <Text size={size} fw={fw} ps={12}>
                            {prefix}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Text size={size} fw={fw}>
                        {includeComma ? toNumber.toLocaleString() : toNumber}
                    </Text>
                    <Text size={size} fw={fw} ps={12}>
                        {suffix}
                    </Text>
                </div>
            )}
            <Text fw={fw} size={size} ref={ref} opacity={0} style={{ position: 'absolute' }}>
                {0}
            </Text>
        </span>
    );
};

const Enhanced = React.memo(AnimatedNumber, (prevProps, nextProps) => {
    return (
        prevProps.toNumber === nextProps.toNumber &&
        prevProps.includeComma === nextProps.includeComma &&
        prevProps.prefix === nextProps.prefix &&
        prevProps.suffix === nextProps.suffix &&
        prevProps.size === nextProps.size &&
        prevProps.fw === nextProps.fw
    );
});

export default Enhanced;
