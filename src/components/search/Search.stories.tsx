import { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@components/search/SearchBar";

function Search() {
  return (
    <SearchBar
      content=""
      handleClick={() => console.log()}
      handleInputChange={(e) => console.log(e)}
    />
  );
}

const meta: Meta<typeof Search> = {
  title: "Search",
  component: Search,
};

export default meta;

type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {},
};
