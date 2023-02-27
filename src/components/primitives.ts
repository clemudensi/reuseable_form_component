import tw, { styled } from 'twin.macro';

export const Container = tw.div`px-48 py-12`;

export const AlertText = styled.span<{
  fontSize?: string;
}>`
  ${tw`
    text-red-600
  `}
  font-size: ${props => (props.fontSize ? `${props.fontSize}` : '1 rem' )};
`;
export const H2Typography = tw.h2`text-3xl font-bold mb-8`;

export const Button = tw.button`
  text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none 
  focus:ring-blue-300 font-medium rounded-lg 
  text-sm w-full sm:w-auto px-5 py-2.5 
  text-center dark:bg-blue-600 
  dark:hover:bg-blue-700 dark:focus:ring-blue-800
  disabled:opacity-50
`;

export const CenterItems = styled.span<{
  padding?: string;
}>`
  ${tw`
    flex justify-center
    w-full
  `}
  padding: ${props => (props.padding ? `${props.padding}` : 0 )};
`;
