package com.example.bookmanagement.repository;

import com.example.bookmanagement.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface BookRepository extends JpaRepository<Book, Long> {
    // Tìm kiếm theo tiêu đề hoặc tác giả (không phân biệt hoa thường)
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);
}
