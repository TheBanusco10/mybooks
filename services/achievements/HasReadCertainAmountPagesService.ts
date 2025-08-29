export default class HasReadCertainAmountPagesService {
  static async execute(pagesCount: number) {
    const { getTotalReadPages } = useStatisticsStore();

    const { sum: totalReadPages } = await getTotalReadPages();

    return totalReadPages >= pagesCount;
  }
}
