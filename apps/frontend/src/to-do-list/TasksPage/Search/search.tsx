import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/Input/input';
import searchQueryParamName from '../../../utils/searchQueryParamName';
import { FormComponent } from '../../../components/Form/form';

export const Seach = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get(searchQueryParamName);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(location.search);
    if (target.value.trim() === '') {
      searchParams.delete(searchQueryParamName);
    } else {
      searchParams.set(searchQueryParamName, target.value);
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <FormComponent>
      <Input
        className='border-solid border-[1px] p-[5px] border-silverChalice w-[100%]'
        placeholder='Filter tasks'
        value={query || ''}
        onChange={onInputChange}
      />
    </FormComponent>
  );
};
