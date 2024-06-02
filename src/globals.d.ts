// To solve issue of accessing form elements by name:
// https://stackoverflow.com/a/67662299/25000856
interface HTMLFormControlsCollection extends HTMLCollectionBase {
  [item: string]: Element | RadioNodeList;
}
