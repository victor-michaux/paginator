export class Paginator {
    private _activePage: number;
    private _totalPages: number;
    private _padding: number;
    private _pages: number[];
    private _activePageChangeCallback: (activePage: number) => void;

    constructor(activePage: number, totalPages: number, activePageChangeCallback: (activePage: number) => void, padding: number = 2) {
        this._activePage = activePage;
        this._totalPages = totalPages;
        this._padding = padding;
        this._activePageChangeCallback = activePageChangeCallback;

        this._pages = this.buildPages();
    }

    get activePage() {
        return this._activePage;
    }

    set activePage(newPage: number) {
        this._activePage = newPage;

        this.pages = this.buildPages();
        this._activePageChangeCallback(this.activePage);
    }

    get totalPages() {
        return this._totalPages;
    }

    set totalPages(newValue: number) {
        this._totalPages = newValue;

        this.pages = this.buildPages();
    }

    get padding() {
        return this._padding;
    }

    set padding(newValue: number) {
        this._padding = newValue;

        this.pages = this.buildPages();
    }

    set pages(newValue: number[]) {
        this._pages = newValue;
    }

    get pages() {
        return this._pages;
    }

    selectNextPage() {
        if (this.activePage < this.totalPages) {
            this.activePage += 1;
        }
    }

    selectPreviousPage() {
        if (this.activePage > 1) {
            this.activePage -= 1;
        }
    }

    selectFirstPage() {
        this.activePage = 1;
    }

    selectLastPage() {
        this.activePage = this.totalPages;
    }

    selectPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.activePage = page;
        }
    }

    private buildPages(): number[] {
        const pages: number[] = [];

        let displayedPageCount = (this.padding * 2) + 1;
        if (displayedPageCount > this.totalPages) {
            displayedPageCount = this.totalPages;
        }

        let firstPage = 1;

        if (this.activePage > this.padding) {
            firstPage = this.activePage - this.padding;
        }

        if (this.activePage + this.padding > this.totalPages) {
            firstPage = this.totalPages - displayedPageCount + 1;
        }

        for(let i = firstPage; i < (firstPage + displayedPageCount); i += 1) {
            pages.push(i);
        }

        return pages;
    }
}

export default Paginator;

