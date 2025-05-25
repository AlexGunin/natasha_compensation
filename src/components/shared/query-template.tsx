import { UseQueryResult } from "@tanstack/react-query";

type QueryStatus = UseQueryResult["status"];

interface QueryTemplateProps extends Record<QueryStatus, React.ReactElement> {
  status: QueryStatus;
}

export const QueryTemplate = (props: QueryTemplateProps) => {
  if (props.status === "error") {
    return props.error;
  }

  if (props.status === "pending") {
    return props.pending;
  }

  return props.success;
};
