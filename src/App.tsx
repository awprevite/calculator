import { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';
import { isOperator, hasOpenParen } from '../util/conditionCheck'
import Button from './Button';

function App() {

  const [prevText, setPrevText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  /* ----- Text Input Handlers ----- */

  const addChar = (char: string) => {
    if(canAppend(currentText, char)){
      setCurrentText(prev => prev + char);
    }
  }

  const delChar = () => { 
    setCurrentText(prev => prev.slice(0, -1))
  }

  const clear = () => {

    if(currentText === '') {
      setPrevText('')
    } else {
      setPrevText(prev => `${prev} = ${currentText}`)
    }
    setCurrentText('');
  }

  /* ----- Text Input Handler Helpers ----- */

  function canAppend(current: string, next: string): boolean {
    const last = current.slice(-1)

    if((last === '' || last === '(') && next === '-') return true

    if(last === 'π' && next == 'π'){
      setErrorMessage('"π" cannot be followed by "π"')
      return false
    }

    if((current === '' || current === '(' || isOperator(last)) && isOperator(next)) {
      setErrorMessage('Invalid operator placement')
      return false
    }

    if(last === '.' && next === '.') {
      setErrorMessage('"." cannot be followed by "."')
      return false
    }

    if(last === '.' && (isOperator(next) || next === '(')) {
      setErrorMessage('"." cannot be followed by an operator')
      return false
    }

    if(next === ')' && !hasOpenParen(current)){
      setErrorMessage('Cannot close ) before opening (')
      return false
    }

    if(last === '(' && next === ')') {
      setErrorMessage('Cannot have empty ()')
      return false
    }

    return true
  }

  /* ----- Evaluation ----- */

  function compute(equation: string){

    if(canCompute(currentText)){
      try{
        let piEquation = equation.replace(/π/g, 'pi');
        setPrevText(currentText)
        setCurrentText(roundToFour(evaluate(piEquation)).toString())
      } catch (error) {
        console.error('Evaluation error: ', error)
        setErrorMessage('Unable to evaluate')
      }
    }

  }

  /* ----- Evaluation Helpers ----- */

  function roundToFour(num: number): number {
    return Math.round(num * 10000) / 10000;
  }

  function canCompute(current: string): boolean {
    const last = current.slice(-1)

    if(isOperator(last)){
      setErrorMessage('Input cannot end with an operator')
      return false
    }
    if(last === '.'){
      setErrorMessage('Input cannot end with "."')
      return false
    }
    if(hasOpenParen(current)){
      setErrorMessage('Input cannot have open parenthesis')
      return false
    }
    if(current.length === 0){
      setErrorMessage('Input cannot be null')
      return false
    }

    return true
  }

  /* ----- Keyboard Events ----- */

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      const key = e.key;

      const map: Record<string, string> = {
        '*': '*',
        '/': '/',
        '+': '+',
        '-': '-',
        '.': '.',
        'Enter': '=',
        '=': '=',
        'Backspace': 'DEL',
        'Delete': 'DEL',
        'Escape': 'C',
        '(': '(',
        ')': ')',
        'π' : 'π',
        'x' : 'X',
      };

      const label = map[key] ?? key;

      const button = document.querySelector(`button[data-label="${label}"]`) as HTMLButtonElement;

      if (button) {
        button.classList.add('active');
        button.click();

        setTimeout(() => button.classList.remove('active'), 100);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  /* ----- Render ----- */
  return (
    <>
    {/* Full screen container */}
      <div className='flex justify-center items-center w-screen h-screen'>
        {/* Calculator container */}
        <div className='flex flex-col min-w-[328px] min-h-[652px] justify-center items-center rounded-4xl p-4 bg-gray-500/30 text-[var(--fg-color)]'>
          {/* Calculator text container */}
          <div className='flex flex-col justify-end items-end bg-[var(--bg-color)] w-full rounded-2xl p-4 max-w-2xs overflow-hidden'>
            {/* Error container */}
            <div className='flex justify-between w-full items-center'>
              <Button label='X' color='gray' onClick={() => setErrorMessage('')} cols={0} />
              <p data-testid='error-message' className='text-red-500 text-xs'>{errorMessage || '\u00A0'}</p>
            </div>
            <p data-testid='prev-text' className='whitespace-nowrap text-lg py-6'>{prevText || '\u00A0'}</p>
            <p data-testid='current-text' className='whitespace-nowrap text-4xl'>{currentText || '\u00A0'}</p>
          </div>
          {/* Button container grid */}
          <div className='grid grid-cols-4 gap-2 p-2'>

            {/* Row 1 */}
            <Button label='(' color='black' onClick={() => addChar('(')} />
            <Button label=')' color='black' onClick={() => addChar(')')} />
            <Button label='^' color='black' onClick={() => addChar('^')} />
            <Button label='%' color='black' onClick={() => addChar('%')} />

            {/* Row 2 */}
            <Button label='C' color='red' onClick={() => clear()} />
            <Button label='DEL' color='red' onClick={() => delChar()} />
            <Button label='π' color='black' onClick={() => addChar('π')} />
            <Button label='/' color='black' onClick={() => addChar('/')} />

            {/* Row 3 */}
            <Button label='7' color='gray' onClick={() => addChar('7')} />
            <Button label='8' color='gray' onClick={() => addChar('8')} />
            <Button label='9' color='gray' onClick={() => addChar('9')} />
            <Button label='*' color='black' onClick={() => addChar('*')} />

            {/* Row 4 */}
            <Button label='4' color='gray' onClick={() => addChar('4')} />
            <Button label='5' color='gray' onClick={() => addChar('5')} />
            <Button label='6' color='gray' onClick={() => addChar('6')} />
            <Button label='-' color='black' onClick={() => addChar('-')} />

            {/* Row 5 */}
            <Button label='1' color='gray' onClick={() => addChar('1')} />
            <Button label='2' color='gray' onClick={() => addChar('2')} />
            <Button label='3' color='gray' onClick={() => addChar('3')} />
            <Button label='+' color='black' onClick={() => addChar('+')} />

            {/* Row 6 */}
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
