import { Flex, Text } from '@mantine/core';
import classes from '../../styles/quiz/AnswerSheet.module.css';

type Props = {
    no: number;
    cnt: number;
    isSolved: boolean[];
    setIsSolved: React.Dispatch<React.SetStateAction<boolean[]>>;
    choiceList: Array<number>;
    setChoiceList: React.Dispatch<React.SetStateAction<number[]>>;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function Option({ no, cnt, isSolved, setIsSolved, choiceList, setChoiceList, setNumber }: Props) {
    const options = [];

    function onClickOption(idx: number) {
        setChoiceList(
            choiceList.map((value, index) => {
                if (index === no) {
                    return idx;
                } else {
                    return value;
                }
            })
        );

        setIsSolved(
            isSolved.map((value, index) => {
                if (index === no) {
                    return true;
                } else {
                    return value;
                }
            })
        );
    }

    for (let i = 0; i < cnt; i++) options.push(i + 1);

    const list = options.map((_, idx) => {
        return (
            <div key={idx}>
                {choiceList[no] === idx ? (
                    <div
                        className={classes.option}
                        onClick={() => {
                            onClickOption(idx);
                        }}
                    >
                        <div className={classes.answerBorder}></div>
                        <div className={classes.answerText}>{idx + 1}</div>
                    </div>
                ) : (
                    <div
                        className={classes.option}
                        onClick={() => {
                            onClickOption(idx);
                        }}
                    >
                        <div className={classes.optionBorder}></div>
                        <div className={classes.optionText}>{idx + 1}</div>
                    </div>
                )}
            </div>
        );
    });

    return (
        <Flex gap={'24px'} key={no}>
            <Flex
                w="28px"
                h="28px"
                justify="center"
                align="center"
                className={classes.number}
                onClick={() => {
                    setNumber(no + 1);
                }}
            >
                <Text size="18px" ta="center" fw="600" lh="28px">
                    {' '}
                    {no + 1}
                </Text>
            </Flex>
            {list}
        </Flex>
    );
}
