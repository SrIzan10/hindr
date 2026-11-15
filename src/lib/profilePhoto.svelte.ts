class ProfilePhoto {
    blob = $state<Blob | null>(null)
    url = $state<string | null>(null)

    set(blob: Blob) {
        if (this.url) URL.revokeObjectURL(this.url)
        this.blob = blob
        this.url = URL.createObjectURL(blob)
    }

    clear() {
        if (this.url) URL.revokeObjectURL(this.url)
        this.blob = null
        this.url = null
    }
}

export const profilePhoto = new ProfilePhoto()
