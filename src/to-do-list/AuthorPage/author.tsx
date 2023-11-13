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
          <div
            className='p-[20px] bg-white mb-[10px] border-solid border-[1px] 
          border-alto leading-normal'
          >
            Hi!👋
            <br />
            <p>
              My name is <strong>Jacob</strong> and
              graduated with a degree in Food Technology
              from the Agricultural University in Cracov. I
              chose as my specialisation
              <em>
                {' '}
                <strong>
                  Fermentation and Technical Microbiology.
                </strong>
              </em>
              <br />
            </p>
            <p>
              I currently work at the largest craft brewery
              in Poland.
            </p>
            <p>
              After work, I go for creamers 🍰 and learn
              programming 👨‍💻.
            </p>
            <p>
              Feel free to visit my{' '}
              <strong>
                <a
                  className='no-underline border-black hover:border-solid hover:border-b-[1px]'
                  rel='norefferer'
                  target='_blank'
                  href='https://github.com/AllmostHumann'
                >
                  Github!
                </a>
              </strong>
            </p>
          </div>
        }
      />
    </Container>
  );
};
