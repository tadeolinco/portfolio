import { prisma } from 'lib/api/db';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sheets = await prisma.sheet.findMany({
    orderBy: {
      order: 'asc',
    },
  });

  if (sheets.length > 0) {
    return {
      redirect: {
        destination: `/sheets/${sheets[0].id}/create-item?referrer=day#init-categoryId-menu`,
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: `/sheets`,
      permanent: false,
    },
  };
};

const Home = () => {
  return null;
};

export default Home;
