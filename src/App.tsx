import { useState } from 'react';
import { evaluate } from 'mathjs';
import Button from './components/Button';

function App() {

  const [prevText, setPrevText] = useState('');
  const [currentText, setCurrentText] = useState('');

  const addChar = (char: string) => {
    if(canAppend(currentText, char)){
      setCurrentText(prev => prev + char);
    }
  }
  const delChar = () => setCurrentText(prev => prev.slice(0, -1))
  const clear = () => {
    if(currentText === '') {
      setPrevText('');
    }
    setCurrentText('');
  }

  const operators = ['+', '-', '*', '/', '%', '^'];
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  function isOperator(char: string) {
    return operators.includes(char);
  }
  function isDigit(char: string) {
    return digits.includes(char);
  }
  function hasOpenParen(expr: string) {
  return (expr.match(/\(/g) || []).length > (expr.match(/\)/g) || []).length;
}

  function canAppend(current: string, next: string): boolean {
    const last = current.slice(-1)

    if((current === '' || isOperator(last)) && isOperator(next)) return false;
  
    if(last === '.' && next === '.') return false;

    if(next === ')' && !hasOpenParen(current)) return false;

    return true
  }

  function compute(equation: string){
    if(canCompute(currentText)){
      setPrevText(currentText)
      setCurrentText(evaluate(equation).toString())
    }
  }

  function canCompute(current: string): boolean {
    const last = current.slice(-1)

    if(isOperator(last) || hasOpenParen(current)) return false;

    return true
  }

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='flex flex-col justify-center items-center rounded-lg p-4 bg-gray-500/30 text-[var(--fg-color)]'>
          <div className='flex flex-col justify-end items-end bg-[var(--bg-color)] w-full rounded-lg p-4 max-w-2xs overflow-hidden'>
            <p className='whitespace-nowrap text-lg py-6'>{prevText || '\u00A0'}</p>
            <p className='whitespace-nowrap text-4xl'>{currentText || '\u00A0'}</p>
          </div>
          <div className='grid grid-cols-4 gap-2 p-2'>
            <Button label='(' color='black' onClick={() => addChar('(')} />
            <Button label=')' color='black' onClick={() => addChar(')')} />
            <Button label='**' color='black' onClick={() => addChar('^')} />
            <Button label='%' color='black' onClick={() => addChar('%')} />
            <Button label='C' color='red' onClick={() => clear()} />
            <Button label='DEL' color='red' onClick={() => delChar()} />
            <Button label='( - )' color='black' onClick={() => {}} />
            <Button label='/' color='black' onClick={() => addChar('/')} />
            <Button label='7' color='gray' onClick={() => addChar('7')} />
            <Button label='8' color='gray' onClick={() => addChar('8')} />
            <Button label='9' color='gray' onClick={() => addChar('9')} />
            <Button label='*' color='black' onClick={() => addChar('*')} />
            <Button label='4' color='gray' onClick={() => addChar('4')} />
            <Button label='5' color='gray' onClick={() => addChar('5')} />
            <Button label='6' color='gray' onClick={() => addChar('6')} />
            <Button label='-' color='black' onClick={() => addChar('-')} />
            <Button label='1' color='gray' onClick={() => addChar('1')} />
            <Button label='2' color='gray' onClick={() => addChar('2')} />
            <Button label='3' color='gray' onClick={() => addChar('3')} />
            <Button label='+' color='black' onClick={() => addChar('+')} />
            <Button label='.' color='gray' onClick={() => addChar('.')} />
            <Button label='0' color='gray' onClick={() => addChar('0')} />
            <Button label='=' color='red' onClick={() => compute(currentText)} cols={2} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
