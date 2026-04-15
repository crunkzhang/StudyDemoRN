import type {ContactLite} from '../../common/models/types';
import type {GroupInfo} from '../../groupChat/models/types';
import type {OfficialAccount} from '../../officialAccount/models/types';

export interface SearchResult {
  contacts: ContactLite[];
  groups: GroupInfo[];
  official: OfficialAccount[];
}
