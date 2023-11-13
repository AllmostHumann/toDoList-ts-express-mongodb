import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/Input/input';
import searchQueryParamName from '../../../utils/searchQueryParamName';

export const Seach = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get(
    searchQueryParamName,
  );

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(
      location.search,
    );
    if (target.value.trim() === '') {
      searchParams.delete(searchQueryParamName);
    } else {
      searchParams.set(searchQueryParamName, target.value);
    }

    navigate(
      `${location.pathname}?${searchParams.toString()}`,
    );
  };

  return (
    <form className='md:flex md:flex-wrap mb-[10px] bg-white p-[20px] grid grid-cols-2 gap-[20px]'>
      <Input
        placeholder='Filter tasks'
        value={query || ''}
        onChange={onInputChange}
      />
    </form>
  );
};
