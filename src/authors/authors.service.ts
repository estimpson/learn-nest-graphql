import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
    private readonly authors: Author[] = [];
    private authorId = 0;

    create(createAuthorInput: CreateAuthorInput) {
        const newAuthor = new Author();
        newAuthor.id = this.authorId++;
        newAuthor.firstname = createAuthorInput.firstname;
        newAuthor.lastName = createAuthorInput.lastName;
        this.authors.push(newAuthor);
    }

    findAll(): Author[] {
        return this.authors;
    }

    findOneById(id: number): Author {
        return this.authors.find((value) => value.id === id);
    }

    update(id: number, updateAuthorInput: UpdateAuthorInput): Author {
        const updateAuthor = this.findOneById(updateAuthorInput.id);
        updateAuthor.firstname = updateAuthorInput.firstname;
        updateAuthor.lastName = updateAuthorInput.lastName;
        return updateAuthor;
    }

    remove(id: number) {
        this.authors.splice(this.authors.indexOf(this.findOneById(id)));
    }
}
