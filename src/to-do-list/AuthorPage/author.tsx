import { Container } from '../../components/Container/container';
import { Header } from '../../components/Header/header';
import { Section } from '../../components/Section/section';

export const AuthorPage = () => {
  return (
    <Container>
      <Header title='Author' />
      <Section
        title='About'
        body={
          <div className='p-[20px] bg-white dark:bg-davysGray font-medium  mt-[2px] leading-normal dark:text-alto '>
            Hi!👋
            <br />
            <p>
              My name is <strong>Jacob</strong> and graduated with a degree in
              Food Technology from the Agricultural University in Cracow.
              <br /> I chose as my specialisation
              <em>
                <strong className='dark:text-platinum'>
                  &nbsp;Fermentation and Technical Microbiology.
                </strong>
              </em>
              <br />
            </p>
            <p>I currently work at the largest craft brewery in Poland.</p>
            <p>After work, I go for creamers 🍰 and learn programming 👨‍💻.</p>
            <p>
              Feel free to visit my
              <strong>
                <a
                  className='no-underline border-black hover:border-solid hover:border-b-[1px] dark:text-alto'
                  rel='norefferer'
                  target='_blank'
                  href='https://github.com/AllmostHumann'
                >
                  &nbsp;Github!
                </a>
              </strong>
            </p>
          </div>
        }
      />
    </Container>
  );
};
