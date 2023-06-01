import { HTMLAttributes } from 'react';
import { GetPlaylistBase } from '../../../types/PlaylistTypes';
import { GetUserDetailsResponse } from '../../../types/UserTypes';
import { GetVideoMetadataResponse } from '../../../types/VideoTypes';
import PlaylistSuggestion from './PlaylistSuggestion';
import UserSuggestion from './UserSuggestion';
import VideoSuggestion from './VideoSuggestion';
import { PreparedSearchResult, SearchResultType } from '../../../types/SearchTypes';

interface SearchSuggestionProps {
  props: HTMLAttributes<HTMLLIElement>;
  option: PreparedSearchResult;
}

function SearchSuggestion({ props, option }: SearchSuggestionProps) {
  switch (option.type) {
    case SearchResultType.Video:
      return (
        <VideoSuggestion
          componentProps={props}
          video={option.result as GetVideoMetadataResponse}
        />
      );
    case SearchResultType.User:
      return (
        <UserSuggestion
          componentProps={props}
          user={option.result as GetUserDetailsResponse}
        />
      );
    case SearchResultType.Playlist:
      return (
        <PlaylistSuggestion
          componentProps={props}
          playlist={option.result as GetPlaylistBase}
        />
      );
  }
}

export default SearchSuggestion;
