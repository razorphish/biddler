import { IDM } from '@biddler/db';
import { OAuth2Request, OAuth2Response } from '../../ui/dto';

/**
 * Implement this interface to provide an oauth2 grant type handler. Handlers must be registered using the
 * decorator @Oauth2Strategy('grant_type')
 */
export interface Oauth2GrantStrategyInterface {
  /**
   * Validate the request return false if the request is not valid within the context of this strategy
   *
   * @param request
   * @param client
   */
  validate(request: OAuth2Request, client: IDM.interfaces.ApiClientOutput): Promise<boolean>;

  /**
   * Get a request from the given response
   *
   * @param request
   * @param client
   */
  getOauth2Response(
    request: OAuth2Request,
    client: IDM.interfaces.ApiClientOutput
  ): Promise<OAuth2Response>;
}
