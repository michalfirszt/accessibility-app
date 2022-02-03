import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import client from '../api/client';
import { handleSelectors } from '../api/shared';

export const ProductPreview = () => {
  const { productId } = useParams();
  const { data } = useQuery(
    ['product', { productId }],
    ({ queryKey: [, param] }) => client.get(`/products/${param.productId}`),
    {
      select: handleSelectors({ product: (data) => data.data }),
    }
  );

  const product = useMemo(() => data?.product || {}, [data]);

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="py-4">
        <div className="py-4">{product.name}</div>
      </div>
    </div>
  );
};
