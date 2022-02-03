import axe from 'axe-core';
import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useLocalStorage } from 'react-use';

import client from '../api/client';
import { handleSelectors } from '../api/shared';
import { Button, Card, Input, ProductLink } from '../components';
import { Posts } from './Posts';

export const SignIn = () => {
  const [usernameKey, setUsernameKey, removeUsernameKey] =
    useLocalStorage('username');
  const [username, setUsername] = useState('');

  const { data } = useQuery('products', () => client.get('/products'), {
    select: handleSelectors({ products: (data) => data.data }),
  });

  const products = useMemo(() => data?.products || [], [data]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setUsernameKey(username);
      setUsername('');
    },
    [setUsernameKey, username]
  );

  const runAudit = useCallback(() => {
    axe.run(document).then((results) => {
      if (results.violations.length) {
        console.error('Accessibility issues found');
        console.log(results.violations);
      }
    });
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="max-w-4xl m-auto px-2 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full">
        <Card>
          {!!usernameKey ? (
            <div>
              <div>current user: {usernameKey}</div>
              <div>
                <Button onClick={removeUsernameKey}>Log out</Button>
              </div>
              <div>
                {browserSupportsSpeechRecognition && (
                  <div className="py-4">
                    <div>Recording: {listening ? 'on' : 'off'}</div>
                    <div className="flex justify-around">
                      <Button
                        onClick={() => SpeechRecognition.startListening()}
                      >
                        Start
                      </Button>
                      <Button onClick={() => SpeechRecognition.stopListening()}>
                        Stop
                      </Button>
                      <Button onClick={resetTranscript}>Reset</Button>
                    </div>
                    <div>{transcript}</div>
                    <div className="py-4">
                      <div className="flex flex-col items-center">
                        {products.map((product, index) => (
                          <div key={index} className="py-2">
                            <ProductLink
                              productId={product.id}
                              transcript={transcript}
                            >
                              {product.name}
                            </ProductLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button onClick={runAudit}>Run audit</Button>
              </div>
              <div>
                <Posts />
              </div>
            </div>
          ) : (
            <form onSubmit={handleOnSubmit}>
              <div>
                <Input
                  name="username"
                  label="Username"
                  defaultValue={username}
                  onChange={setUsername}
                  type="text"
                  required
                />
              </div>
              <div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
